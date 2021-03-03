import React from 'react';
import "../css/sidebarRow.css";

const SidebarRow = ({title, Icon, rang}) => {
    return (
        <div className="sidebarRow">
            {Icon && <Icon style={{color: `${rang}` , fontSize: "29px"}} />}

            <div>{title}</div>

        </div>
    )
}

export default SidebarRow;
