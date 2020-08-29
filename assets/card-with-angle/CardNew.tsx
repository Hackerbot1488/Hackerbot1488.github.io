import React from "react";
import "./CardNew.scss";
export const CardNew: React.FC<{}> = () => {
	return (
		<div className="new-card">
			<div className="head">
				<div className="head__angle"></div>
				<div className="head__end"></div>
			</div>
			<div className="body"></div>
		</div>
	);
};
