import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function hashPassword(password) {
  try {
    const passwordHashed = await bcrypt.hash(password, saltRounds);
    return passwordHashed;
  } catch (error) {
    throw error;
  }
}

export async function comparePassword(passwordText, passwordHash) {
  try {
    const passwordChecked = await bcrypt.compare(passwordText, passwordHash);
    return passwordChecked;
  } catch (error) {
    throw error;
  }
}
