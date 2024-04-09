import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function hashPassword(password) {
  let passwordHashed;

  try {
    passwordHashed = await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw error;
  }

  return passwordHashed;
}

export async function comparePassword(passwordText, passwordHash) {
  // let passwordChecked;

  try {
    const passwordChecked = await bcrypt.compare(passwordText, passwordHash);
    return passwordChecked;
  } catch (error) {
    throw error;
  }

  // return passwordChecked;
}
