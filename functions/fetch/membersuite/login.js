export default async function login(credentials) {
  const requestBody = JSON.stringify({
    ...credentials,
    clientID: process.env.MEMBERSUITE_CLIENT_ID,
  })

  const res = await fetch(
    `${process.env.MEMBERSUITE_API_URL}/authtoken/33409`,
    {
      method: 'POST',
      body: requestBody,
      headers: { 'Content-Type': 'application/json' },
    }
  )

  if (res.status !== 200) {
    return null
  } else {
    return await res.text()
  }
}
