import React from 'react';
import {
    HiOutlineAcademicCap,
    HiOutlineViewColumns,
    HiOutlineBuildingOffice2,
    HiOutlineShieldCheck,
    HiOutlineUsers,
    HiOutlineCog6Tooth,
    HiOutlineBell,
    HiOutlineQuestionMarkCircle,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
    HiOutlineShieldExclamation,
    HiOutlineUserCircle,
    HiOutlineUserGroup,
    HiOutlineLockOpen,
    HiOutlineAdjustmentsHorizontal,
    HiOutlineCheckBadge,
    HiOutlinePlus,
    HiOutlinePencilSquare,
    HiOutlineEllipsisVertical,
    HiOutlineEllipsisHorizontal,
    HiOutlineUserPlus,
    HiOutlineMagnifyingGlass,
    HiOutlinePhoto,
    HiOutlineArrowRightOnRectangle,
    HiOutlineLockClosed,
    HiOutlineEye,
    HiOutlineEyeSlash,
    HiOutlineUser,
    HiOutlineBanknotes,
    HiOutlineEnvelope,
    HiOutlineLink,
    HiOutlineCalendarDays,
    HiOutlineArrowDownTray,
    HiOutlineMapPin,
    HiOutlineSquares2X2,
    HiOutlineXMark,
    HiOutlineInformationCircle,
    HiOutlineClock,
    HiOutlineTrash,
    HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { cn } from "@/utils/cn";

type IconProps = {
    name: string;
    className?: string;
};

const ICON_MAP: Record<string, React.ElementType> = {
    'school': HiOutlineAcademicCap,
    'dashboard': HiOutlineViewColumns,
    'corporate_fare': HiOutlineBuildingOffice2,
    'admin_panel_settings': HiOutlineShieldCheck,
    'group': HiOutlineUsers,
    'settings': HiOutlineCog6Tooth,
    'notifications': HiOutlineBell,
    'help': HiOutlineQuestionMarkCircle,
    'chevron_left': HiOutlineChevronLeft,
    'chevron_right': HiOutlineChevronRight,
    'security': HiOutlineShieldExclamation,
    'person_pin': HiOutlineUserCircle,
    'family_restroom': HiOutlineUserGroup,
    'lock_open': HiOutlineLockOpen,
    'tune': HiOutlineAdjustmentsHorizontal,
    'verified_user': HiOutlineCheckBadge,
    'add': HiOutlinePlus,
    'edit': HiOutlinePencilSquare,
    'more_vert': HiOutlineEllipsisVertical,
    'more_horiz': HiOutlineEllipsisHorizontal,
    'person_add': HiOutlineUserPlus,
    'search': HiOutlineMagnifyingGlass,
    'image': HiOutlinePhoto,
    'logout': HiOutlineArrowRightOnRectangle,
    'lock': HiOutlineLockClosed,
    'visibility': HiOutlineEye,
    'visibility_off': HiOutlineEyeSlash,
    'person_outline': HiOutlineUser,
    'person': HiOutlineUser,
    'payments': HiOutlineBanknotes,
    'mail': HiOutlineEnvelope,
    'link': HiOutlineLink,
    'arrow_forward_ios': HiOutlineChevronRight,
    'calendar_month': HiOutlineCalendarDays,
    'download': HiOutlineArrowDownTray,
    'location_on': HiOutlineMapPin,
    'grid_view': HiOutlineSquares2X2,
    'close': HiOutlineXMark,
    'info': HiOutlineInformationCircle,
    'clock': HiOutlineClock,
    'delete': HiOutlineTrash,
    'warning': HiOutlineExclamationTriangle,
    'arrow_back': HiOutlineChevronLeft,
};

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
    const IconComponent = ICON_MAP[name];

    if (!IconComponent) {
        process.env.NODE_ENV === 'development' && console.warn(`Icon "${name}" not found in ICON_MAP`);
        return <span className={className}>{name}</span>;
    }

    return (
        <IconComponent
            className={cn(
                "text-xl shrink-0", // Default to text-xl (20px) which is better than standard
                className
            )}
        />
    );
};
