export default async function getUser(token) {
  const res = await fetch(`https://rest.membersuite.com/platform/v2/whoami`, {
    method: 'GET',
    headers: { Authorization: token },
    redirect: 'follow',
  })

  if (res.status !== 200) {
    return null
  } else {
    return await res.json()
  }
}
