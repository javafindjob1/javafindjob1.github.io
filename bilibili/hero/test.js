// const text = "Abc def abc def";
// const pattern = /(abc) (def)/gi;
// const matches = text.matchAll(pattern);

// for (const match of matches) {
//   console.log("Full match:", match[0]);
//   console.log("Group 1:", match[1]);
//   console.log("Group 2:", match[2]);
// }

const str = "|cffbeedc7狂战神：根据无畏跳斩的技能等级提高自身物理伤害。|r|cffbeedc7ABC"
// const str2 = "|cffbeedc7狂战神：根据无畏跳斩的技能等级提高自身物理伤害。|r|n|n|cffd6d5b7爱尔莎处获得的八角形怪异魔晶，明明只是无机物，却总感觉它在慢慢蠕动......|r"
const str2 = "好好先生|n|cffbeedc7狂战神：根据无畏跳斩的技能等级提高自身物理伤害。|r|n|n|cffd6d5b7爱尔莎处获得的八角形怪异魔晶，明明只是无机物，却总感觉它在慢慢蠕动......|r"

// String[] sdf = desc.split("\\|n");
// StringBuffer buf = new StringBuffer();
// String color = "|cffffffff";
// for (String string : sdf) {
//   color = handle(string, buf, color);
// }
// return buf.toString();

let strs = str2.split("|n")
console.log(formatHtmlString(strs))

function formatHtmlString(strs){
  var obj = {
    str: '',
    buf: '',
    lastColor: '|cfffff'
  }
  for(const p of strs){
    obj.str = p
    obj = handle(obj)
  }
  return obj.buf
}

function handle({ str, buf, lastColor }) {

  str = str.replace("/\|r\|cff/gi", "|cff")
  str = str.replace("|r", "|cfffff")

  if (!str.startsWith("|cff")) {
    str = lastColor + str
  }
  buf += "<p>"

  const pat = /(\|cff(\w{3,6}))(.*?)(?=((\|cff)|$))/gi
  const mat = str.matchAll(pat)
  for (const match of mat) {
    console.log("Full match:", match[0]);
    console.log("Group 1:", match[2]);
    console.log("Group 2:", match[3]);
    lastColor = match[1]
    const color = match[2]
    const text = match[3]
    buf += `<span style="color:#${color}">${text}</span>`
  }
  buf += "</p>"

  return { str, buf, lastColor }
}

fetch