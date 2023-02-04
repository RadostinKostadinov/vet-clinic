import bcrypt from 'bcrypt';

export async function comparePasswords(unhashed, hashed) {
  const isMatch = await bcrypt.compare(unhashed, hashed);
  return new Promise((resolve, reject) => {
    if (isMatch) {
      resolve(true);
    } else {
      const error = new Error('Passwords doesn\'t match.');
      error.code = 'not-match';
      reject(error);
    }
  });
}
