import './ItemStatus.css'

const ItemStatus = ({active, toggleStatus}) => {
    return <div className="item-status-wrapper">
    <div className="item-status-toggler">
      {
      active ? 
      <div className="active-item-status" onClick={toggleStatus}>ON</div> 
      : 
      <div className="inactive-item-status" onClick={toggleStatus}>OFF</div>
      }
    </div>
  </div>
}

export default ItemStatus