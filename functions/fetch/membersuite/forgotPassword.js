export default async function forgotPassword(email) {
  const res = await fetch(`/api/membersuite/forgotPassword`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
    }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.status !== 200) {
    return null
  } else {
    return res
  }
}
