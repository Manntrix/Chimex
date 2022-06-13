export default async function getMembershipProduct(token, membershipProductId) {
  const res = await fetch(
    `https://rest.membersuite.com/orders/v1/products/details/${membershipProductId}`,
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
