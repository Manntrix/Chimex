export default async function getMembershipOrganization(
  token,
  membershipOrganizationId
) {
  const res = await fetch(
    `https://rest.membersuite.com/membership/v1/membershiporganizations/${membershipOrganizationId}`,
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
