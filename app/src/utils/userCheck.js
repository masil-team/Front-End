export default function userCheck() {
  let check;
  let user = sessionStorage.getItem('user');
  user = JSON.parse(user);
  if (user == null || undefined) {
    check = false;
  } else {
    check = true;
  }

  return check;
}
