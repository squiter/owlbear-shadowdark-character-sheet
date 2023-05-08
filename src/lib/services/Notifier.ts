import OBR from "@owlbear-rodeo/sdk";
import { pluginId } from "./OBRHelper";

export const NOTIFICATION_KEY = pluginId("notification");

export type NotifyOptions = {
  secret?: boolean;
};

export async function notifiy(msg: string, options: NotifyOptions = {}) {
  if (OBR.isAvailable) {
    if (options.secret) {
      notifySecretly(msg);
    } else {
      const myName = await OBR.player.getName();
      OBR.room.setMetadata({
        [NOTIFICATION_KEY]: `${myName} rolled: ${msg}`,
      });
    }
  } else {
    alert(msg);
  }
}

function notifySecretly(msg: string) {
  const popoverId = pluginId("popover");
  OBR.popover
    .open({
      id: popoverId,
      url: `/popover.html?msg=${encodeURIComponent("Secret: " + msg)}`,
      height: 100,
      width: 400,
    })
    .then(() => {
      setTimeout(() => {
        OBR.popover.close(popoverId);
      }, 2000);
    })
    .catch(() => alert(msg));
}
