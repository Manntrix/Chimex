export default async function getMembership(token, membershipId) {
  const res = await fetch(
    `https://rest.membersuite.com/membership/v1/memberships/${membershipId}`,
    {
      method: 'GET',
      headers: { Authorization: token },
      redirect: 'follow',
    }
  )

  if (res.status !== 200) {
    return null
  } else {
    return await res.json()
  }
}
