import { UserRole } from "@/common/domain/user"

export const roleColorsMap: any = {
  [UserRole.ADMIN]: "danger",
  [UserRole.CONSUMER]: "success"
}
