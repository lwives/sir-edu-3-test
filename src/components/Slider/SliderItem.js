import React from 'react'
import CardMediaItem  from 'components/Cards/MediaItem'
import CardJudgementItem from 'components/Cards/JudgementItem'
import CardAdaptationItem from 'components/Cards/AdaptationItem'
import './Slider.scss'

const cardTextStyle = {
    overflow: 'hidden',
    padding: '0 16px',
    height: 40
}

class SliderItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { item, editable, actions } = this.props;
        const type = item.hasOwnProperty('contentType') ? item.contentType.split('/')[0] : item.type;
        let card;
        
        switch (type) {
            case 'image':
            case 'video':
                card = (<CardMediaItem item={item} editable={editable} actions={actions}/>);
                break;
            case 'judgement':
                console.log(item);
                card = (<CardJudgementItem item={item} editable={editable} />);
                break;
            case 'adaptation':
            case 'attendance':
            case 'plan':
                console.log(item);
                card = (<CardAdaptationItem item={item} editable={editable} />);
                break;
            default:
                card = null;
        }
        return card;
    }
};

export default SliderItem;