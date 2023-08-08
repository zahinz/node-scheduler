import { Op } from "sequelize";
import Message from "../../database/model/Message";
import { CronJob } from "cron";

export async function sendAnnualMessage() {
  const today = new Date();
  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);

  const startOfLastYear = new Date(lastYear);
  startOfLastYear.setHours(0, 0, 0, 0);

  const messages = await Message.findAll({
    where: {
      created_at: {
        [Op.gte]: startOfLastYear,
        [Op.lt]: lastYear,
      },
    },
  })
    .then((value) => value.map((item) => item.dataValues))
    .catch((error) => console.log(error));

  console.log(messages);
  for (let i = 0; i < messages.length; i++) {
    // sentEmail()
    // console.log(messages[i].message);
  }
}

const sendAnnualMessageJob = new CronJob(
  "11 13 * * *",
  function () {
    try {
      sendAnnualMessage();
    } catch (error) {
      console.log(error);
    }
  },
  null,
  true,
  "Asia/Kuala_Lumpur"
);

export default sendAnnualMessageJob;
