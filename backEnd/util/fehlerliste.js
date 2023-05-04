import { getOpenOrders, orderCount } from "../controller/orderController";
import { corsFehlerFangen, corsOriginVsWhitelistPrüfung } from "../middleware/corsMiddleware";

getOpenOrders() // 599
corsFehlerFangen() // 598
corsOriginVsWhitelistPrüfung() // 597
orderCount() // 596
