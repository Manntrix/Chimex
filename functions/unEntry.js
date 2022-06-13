export default function unEntry(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&#038;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&#8217;/g, "'")
    .replace(/&gt;/g, '>')
}
