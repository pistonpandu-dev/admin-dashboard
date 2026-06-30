'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Image, Video, Grid, List, Search, Filter } from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'

export default function GalleryPage() {
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  // Mock data
  const files = [
    { id: 1, type: 'image', name: 'Screenshot_2024-01-15.png', size: '2.4 MB', date: '2024-01-15 14:30' },
    { id: 2, type: 'video', name: 'ScreenRecording_2024-01-15.mp4', size: '15.6 MB', date: '2024-01-15 13:20' },
    { id: 3, type: 'image', name: 'Photo_2024-01-14.jpg', size: '3.1 MB', date: '2024-01-14 10:45' },
    { id: 4, type: 'image', name: 'Screenshot_2024-01-14.png', size: '1.8 MB', date: '2024-01-14 09:15' },
    { id: 5, type: 'video', name: 'ScreenRecording_2024-01-13.mp4', size: '22.3 MB', date: '2024-01-13 16:50' },
  ]

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || file.type === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gallery</h1>
        <p className="text-muted-foreground">Photos and videos shared from Android devices</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Media Files</CardTitle>
          <CardDescription>All shared media from connected devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Files</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex rounded-lg border">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-4">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No files found</h3>
              <p className="text-sm text-muted-foreground">No media files match your search.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredFiles.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
                >
                  <div className="flex h-full items-center justify-center">
                    {file.type === 'image' ? (
                      <Image className="h-12 w-12 text-muted-foreground" />
                    ) : (
                      <Video className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="truncate text-xs text-white">{file.name}</p>
                    <p className="text-xs text-white/60">{file.size}</p>
                  </div>
                  <div className="absolute right-2 top-2">
                    {file.type === 'image' ? (
                      <Image className="h-4 w-4 text-white/60" />
                    ) : (
                      <Video className="h-4 w-4 text-white/60" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    {file.type === 'image' ? (
                      <Image className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Video className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{file.size}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{file.date}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
