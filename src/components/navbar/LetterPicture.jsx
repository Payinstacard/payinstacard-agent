export const createImageFromInitials = (size, name, color) => {
  if (name == null) return;
  name = getInitials(name);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = canvas.height = size;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);

  context.fillStyle = `${color}`;
  context.fillRect(0, 0, size, size);

  context.fillStyle = "#fff";
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = `${size / 2}px Roboto`;
  context.fillText(name, size / 2, size / 2);

  return canvas.toDataURL();
};

export const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#F4755B";
  // for (var i = 0; i < 6; i++) {
  //   color += letters[Math.floor(Math.random() * 16)];
  // }
  return color;
};

const getInitials = (name) => {
  let initials;
  const nameSplit = name.split(" ");
  console.log(nameSplit);
  const nameLength = nameSplit.length;
  if (nameLength > 1) {
    initials = nameSplit[0].substring(0, 1);
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1);
  } else return;

  return initials.toUpperCase();
};
