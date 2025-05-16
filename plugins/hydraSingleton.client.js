import Hydra from 'hydra-synth'

const hydra1 = new Hydra({
    detectAudio: false,
})
hydra1.canvas.style['z-index'] = '1';
// hydra.canvas.style['width'] = '100%'
// hydra.canvas.style['height'] = '50%';

function showCanvas() {
    hydra1.canvas.style['display'] = 'block';
}
function hideCanvas() {
    hydra1.canvas.style['display'] = 'none';
}
export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp
    hideCanvas()
    nuxtApp.provide('hydra1', hydra1)
    nuxtApp.provide('showCanvas', showCanvas)
  })