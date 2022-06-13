export default async function updatePassword(token, passwordData) {
  const res = await fetch('/api/membersuite/updatePassword/', {
    method: 'POST',
    body: JSON.stringify({
      token: token,
      passwordData: passwordData,
    }),
  })

  if (res.status !== 200) {
    return null
  } else {
    return await res.json()
  }
}
