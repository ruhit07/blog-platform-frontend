/* eslint-disable react/prop-types */
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Textarea } from '@material-tailwind/react'

const UpdateBlog = ({ open, setOpen, handleChange, formData, handleSubmit, handleEdit }) => {

  return (
    <Dialog open={open} handler={handleEdit}>
      <DialogHeader>Update Blog Post</DialogHeader>
      <form onSubmit={handleSubmit}>
        <DialogBody>
          <div className="space-y-4">
            <Input
              type="text"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
            <Textarea
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              fullWidth
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setOpen(false)} className="mr-2">
            Cancel
          </Button>
          <Button type="submit" color="blue">
            Save
          </Button>
        </DialogFooter>
      </form>

    </Dialog>
  )
}

export default UpdateBlog