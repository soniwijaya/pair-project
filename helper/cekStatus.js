function checkDate(params) {
  const batasPeminjaman = new Date(params);
  const today = new Date();
  const one_day = 1000 * 60 * 60 * 24;
  let sisaHari = Math.ceil((today.getTime() - batasPeminjaman.getTime()) / (one_day));
  if(sisaHari >= 0) return 'completed'
  return 'process'
}

module.exports = {
  checkDate: checkDate
}