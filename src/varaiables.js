import { FcHome, FcPortraitMode, FcPlanner, FcSettings } from 'react-icons/fc';

export const home = [
    { id: 1, name: 'My Tasks', link: '/task', icon: 'home', size: 50, },
    { id: 2, name: "Other's Task", link: '/otherstodo', icon: 'others', size: 60, },
    { id: 3, name: "Add Users", link: '/adduser', icon: 'add', size: 55, },
    { id: 4, name: "Settings", link: '/setting', icon: 'setting', size: 70, },

]

export function renderIcon(text, size, color) {
    switch (text) {
        case 'home': return <FcHome size={size ? size : null} color={color ? color : null} />
        case "others": return <FcPlanner size={size ? size : null} color={color ? color : null} />
        case "add": return <FcPortraitMode size={size ? size : null} color={color ? color : null} />
        case "setting": return <FcSettings size={size ? size : null} color={color ? color : null} />
        default: return <FcHome />
    }
}