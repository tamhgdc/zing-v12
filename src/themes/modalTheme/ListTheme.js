import LonDon from "~/assets/bg/LondonThumb.png";
import dynamicLightDark from "~/assets/bg/dynamicLightDark.jpg";
import dynamicBlue from "~/assets/bg/dynamicBlue.jpg";
import dynamicPink from "~/assets/bg/dynamicPink.jpg";
import xoneThumbn from "~/assets/bg/xoneThumbn.jpg";
import zma from "~/assets/bg/zma.jpg";
import eiffel from "~/assets/bg/eiffel.jpg";
import IU from "~/assets/bg/iu.jpg";
import jiChangWook from "~/assets/bg/jiChangWook.jpg";
import lisa from "~/assets/bg/lisa.jpg";
import jennie from "~/assets/bg/jennie.jpg";
import jisoo from "~/assets/bg/jisoo.jpg";
import rose from "~/assets/bg/rose.jpg";
import dark from "~/assets/bg/dark.jpg";
import purple from "~/assets/bg/purple.jpg";
import blue from "~/assets/bg/blue.jpg";
import blueLight from "~/assets/bg/blueLight.jpg";
export const LIST_THEME = [
  {
    id: 1,
    header: "Dynamic",

    data: [
      {
        type: "lonDonTheme",
        image: `${LonDon}`,
        title: "London",
      },
      {
        type: "lightDarkTheme",
        image: `${dynamicLightDark}`,
        title: "Sáng Tối",
      },
      {
        type: "dynamicBlueTheme",
        image: `${dynamicBlue}`,
        title: "Xanh Da Trời",
      },
      {
        type: "dynamicPink",
        image: `${dynamicPink}`,
        title: "Hồng",
      },
    ],
  },
  {
    id: 2,
    header: "Chủ đề",
    data: [
      {
        type: "xoneTheme",
        image: `${xoneThumbn}`,
        title: "XONE",
      },
      {
        type: "zmaTheme",
        image: `${zma}`,
        title: "Zing Music Awards",
      },
      {
        type: "eiffelTheme",
        image: `${eiffel}`,
        title: "Tháp Eiffel",
      },
    ],
  },
  {
    id: 3,

    header: "Nghệ sĩ",
    data: [
      {
        type: "iuTheme",
        image: `${IU}`,
        title: "IU",
      },
      {
        type: "jiChangWookTheme",
        image: `${jiChangWook}`,
        title: "Ji Chang Wook",
      },
      {
        type: "lisaTheme",
        image: `${lisa}`,
        title: "Lisa",
      },
      {
        type: "jennieTheme",
        image: `${jennie}`,
        title: "Jennie Kim",
      },
      {
        type: "jisooTheme",
        image: `${jisoo}`,
        title: "Jisoo",
      },
      {
        type: "roseTheme",
        image: `${rose}`,
        title: "Rosé",
      },
    ],
  },
  {
    id: 4,
    header: "Màu Tối",
    data: [
      {
        type: "darkTheme",
        image: `${dark}`,
        title: "Dark",
      },
      {
        type: "purpleTheme",
        image: `${purple}`,
        title: "Tím",
      },
      {
        type: "blueTheme",
        image: `${blue}`,
        title: "Xanh Đậm",
      },
      {
        type: "blueLightTheme",
        image: `${blueLight}`,
        title: "Xanh Biển",
      },
    ],
  },
];
