export default function dynamicScript(src) {
  for (let i = 0; i < src.length; i++) {
    const dynamicScript = document.querySelector(`[data-dynamic-index="${i}"]`)
    if (!dynamicScript) {
      const script = document.createElement('script')
      script.src = src[i]
      script.dataset.dynamicIndex = i
      document.head.appendChild(script)
    }
  }
}
