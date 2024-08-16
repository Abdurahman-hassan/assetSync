import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const Message = ({ type, children }) => {

    const [msgColor, setMsgColor] = useState('#eeeeee');
    const [msgbackgroundColor, setMsgBackgroundColor] = useState('#32e0c336');

    useEffect(() => {
        switch (type) {
            case 'success':
                setMsgColor('#61d366');
                setMsgBackgroundColor('#61d3664f');
                break;
            case 'error':
                setMsgColor('#ff4545');
                setMsgBackgroundColor('#ff45456e');
                break;
            case 'warning':
                setMsgColor('#ffc107');
                setMsgBackgroundColor('#ffc1076b');
                break;
            default:
                setMsgColor('#eeeeee');
                setMsgBackgroundColor('32e0c336');
                break;
        }
    }, [type]);

    return (
        <div
            style={{ 
            padding: '15px', 
            backgroundColor: msgbackgroundColor, 
            color: msgColor, 
            borderRadius: '5px', 
            margin: '10px 0', 
            border: '1px solid',
            borderColor: msgColor,
            textAlign: 'center',
            }}>
            {children}
        </div>
    );

};

Message.propTypes = {
    type: PropTypes.oneOf(['success', 'error', 'warning']).isRequired,
    children: PropTypes.node.isRequired,
};

export default Message;
