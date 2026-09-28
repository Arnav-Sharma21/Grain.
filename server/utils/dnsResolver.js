import dns from 'dns';
import https from 'https';

// Fallback to DNS-over-HTTPS (DoH) if local network / c-ares fails to resolve SRV or TXT records
function resolveViaDoH(name, type) {
  return new Promise((resolve, reject) => {
    const url = `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

const origResolve = dns.promises.resolve;
dns.promises.resolve = async function (name, rrtype) {
  try {
    return await origResolve.call(this, name, rrtype);
  } catch (err) {
    if (['EBADRESP', 'ESERVFAIL', 'ECONNREFUSED', 'ENOTFOUND', 'ETIMEOUT'].includes(err.code)) {
      if (rrtype === 'SRV') {
        const data = await resolveViaDoH(name, 'SRV');
        if (data && data.Answer) {
          return data.Answer.map(ans => {
            const parts = ans.data.split(' ');
            return {
              priority: parseInt(parts[0], 10),
              weight: parseInt(parts[1], 10),
              port: parseInt(parts[2], 10),
              name: parts[3].replace(/\.$/, '')
            };
          });
        }
      } else if (rrtype === 'TXT') {
        const data = await resolveViaDoH(name, 'TXT');
        if (data && data.Answer) {
          return data.Answer.map(ans => [ans.data.replace(/^"|"$/g, '')]);
        }
      }
    }
    throw err;
  }
};

const origResolveCb = dns.resolve;
dns.resolve = function (name, rrtype, callback) {
  if (typeof rrtype === 'function') {
    callback = rrtype;
    rrtype = 'A';
  }
  dns.promises.resolve(name, rrtype)
    .then(result => callback(null, result))
    .catch(err => callback(err));
};
