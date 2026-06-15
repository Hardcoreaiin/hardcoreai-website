import { create } from 'zustand'

interface ProjectStore {
  isNewProjectModalOpen: boolean
  openNewProjectModal: () => void
  closeNewProjectModal: () => void
}

export const useProjectStore = create<ProjectStore>((set) => ({
  isNewProjectModalOpen: false,
  openNewProjectModal: () => set({ isNewProjectModalOpen: true }),
  closeNewProjectModal: () => set({ isNewProjectModalOpen: false }),
}))
