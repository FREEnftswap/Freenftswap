---
to: src/components/<%= name %>/<%= name %>.tsx
---
import { <%= name %>PropsType } from './<%= name %>.types';

const <%= name %>: React.FC<<%= name %>PropsType> = () => {
  return (
    <div>
      <%= name %> components
    </div>
  )
}

export default <%= name %>

