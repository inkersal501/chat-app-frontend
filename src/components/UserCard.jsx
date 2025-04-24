function UserCard({name}) {
  return (
    <div className="flex items-center gap-3">
        <span className="size-10 flex items-center border border-[#5856d6] rounded-lg justify-center font-medium text-xl bg-[#5856d6] mx-0">{name[0]}</span>
        <span>{name}</span>
    </div> 
  )
}

export default UserCard;