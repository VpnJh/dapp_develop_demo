import router from "@/router/index.js";
export const getAssetsImageUrl = pathName => {
  try {
    let pngImages = {};
    if (pathName.endsWith(".png")) {
      pngImages = import.meta.glob("@/assets/images/**/*.png", {
        eager: true
      });
    }
    if (pathName.endsWith(".jpeg")) {
      pngImages = import.meta.glob("@/assets/images/**/*.jpeg", {
        eager: true
      });
    }
    if (pathName.endsWith(".jpg")) {
      pngImages = import.meta.glob("@/assets/images/**/*.jpg", {
        eager: true
      });
    }
    if (pathName.endsWith(".webp")) {
      pngImages = import.meta.glob("@/assets/images/**/*.webp", {
        eager: true
      });
    }
    if (pathName.endsWith(".svg")) {
      pngImages = import.meta.glob("@/assets/images/**/*.svg", {
        eager: true
      });
    }
    return pngImages["/src/assets/images" + pathName].default;
  } catch (error) {
    console.error("GetAssetsImageUrl Not Found " + pathName, error.toString());
    return "";
  }
};
export function goToPage(pageName) {
  router.push({ name: pageName });
}
export const truncateString = (str, pointLength = 3) => {
  if (!str) return str;
  const points = ".".repeat(pointLength);
  return str.replace(/(^.{5})(.*)(.{5}$)/, `$1${points}$3`);
};
export const formattedNumber = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const convertDateTimeToDate = dateTimeString => {
  const dateTime = new Date(dateTimeString);
  if (isNaN(dateTime)) {
    // 输入的日期时间字符串无效
    return null;
  }
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1
  const day = String(dateTime.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
