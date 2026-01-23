export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            blocks: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    type: 'hero' | 'sticky_split' | 'grid_gallery' | 'interactive_visual'
                    slug: string | null
                    data: Json
                    page_id: string | null
                    sort_order: number | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    type: 'hero' | 'sticky_split' | 'grid_gallery' | 'interactive_visual'
                    slug?: string | null
                    data?: Json
                    page_id?: string | null
                    sort_order?: number | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    type?: 'hero' | 'sticky_split' | 'grid_gallery' | 'interactive_visual'
                    slug?: string | null
                    data?: Json
                    page_id?: string | null
                    sort_order?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "fk_page"
                        columns: ["page_id"]
                        referencedRelation: "pages"
                        referencedColumns: ["id"]
                    }
                ]
            }
            pages: {
                Row: {
                    id: string
                    title: string
                    seo_title: string | null
                    seo_description: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    title: string
                    seo_title?: string | null
                    seo_description?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    seo_title?: string | null
                    seo_description?: string | null
                    created_at?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
