import db from "../../../firebase/Firebase";
export const terbanyak = db.collection("obats").orderBy("stok", "desc");
export const terendah = db.collection("obats").orderBy("stok", "asc");
export const terbaru = db.collection("obats").orderBy("date", "desc");
export const terlama = db.collection("obats").orderBy("date", "asc");
