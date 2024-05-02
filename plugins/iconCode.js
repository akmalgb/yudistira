import Vue from 'vue'

export default () => {
  Vue.filter('icon', function (icon) {
    const icon_code = {
      bind: '/subjectIcon/bindo.png',
      biologi: '/subjectIcon/biologi.png',
      ekonomi: '/subjectIcon/ekonomi.png',
      fisika: '/subjectIcon/fisika.png',
      bing: '/subjectIcon/english.png',
      fisika: '/subjectIcon/fisika.png',
      geografi: '/subjectIcon/geografi.png',
      ipa: '/subjectIcon/ipa.png',
      ips: '/subjectIcon/ips.png',
      kewarganegaraan: '/subjectIcon/kewarganegaraan.png',
      kimia: '/subjectIcon/kimia.png',
      mtk: '/subjectIcon/matematika.png',
      pai: '/subjectIcon/pai.png',
      sejarah: '/subjectIcon/sejarah.png',
      senbud: '/subjectIcon/senbud.png',
      tik: '/subjectIcon/tik.png',
    }
    return icon_code[icon]
  })
}
