import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function ToolTip({ children, position, title }) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {title}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement={position ? position : "right"}
      overlay={renderTooltip}
    >
      {children}
    </OverlayTrigger>
  );
}

export default ToolTip;
