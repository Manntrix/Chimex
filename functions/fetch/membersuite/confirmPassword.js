export default async function confirmPassword(email, code, newPassword) {
  const res = await fetch(`/api/membersuite/resetPassword`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      code: code,
      newPassword: newPassword,
    }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.status !== 200) {
    return null
  } else {
    return res
  }
}
