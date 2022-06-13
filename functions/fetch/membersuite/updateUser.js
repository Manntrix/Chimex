export default async function updateUser(token, userId, userData) {
  const res = await fetch('/api/membersuite/updateUser/', {
    method: 'PUT',
    body: JSON.stringify({
      token: token,
      userId: userId,
      userData: userData,
    }),
  })

  if (res.status !== 200) {
    return null
  } else {
    return await res.json()
  }
}
