export default async function getMembershipType(token, membershipIdTypeId) {
  const res = await fetch(
    `https://rest.membersuite.com/membership/v1/membershiptypes/${membershipIdTypeId}`,
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
