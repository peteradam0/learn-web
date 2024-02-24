import { SearchIcon } from "@/course/ui/search-icon"
import { Input } from "@nextui-org/react"
import { Form } from "react-hook-form"

export const SearchBar = ({ setSearch }: any) => {
  return (
    <div style={{ marginBottom: "5%", paddingLeft: "2px", width: "30%" }}>
      <Input
        type="email"
        radius="sm"
        variant="underlined"
        onChange={e => setSearch(e.target.value)}
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
    </div>
  )
}
