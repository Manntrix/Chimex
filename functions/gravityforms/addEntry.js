export default async function addEntry(formId, inputs) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', process.env.NEXT_PUBLIC_GRAVITYFORMS_TOKEN)
  myHeaders.append('Content-Type', 'application/json')

  var raw = JSON.stringify({
    form_id: formId,
    ...inputs,
  })

  const res = await fetch(
    'https://chimex.chimecentral.org/wp-json/gf/v2/entries',
    {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }
  )

  if (res.status !== 201) {
    return null
  } else {
    return res
  }
}
