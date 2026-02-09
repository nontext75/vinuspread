const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://qsdrlwqmvtcczykginoz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzZHJsd3FtdnRjY3p5a2dpbm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNDgzNjAsImV4cCI6MjA4NDcyNDM2MH0.XzFgNoty5BRpSIBVbfzhOL56f8wp-DGM0QHkjMpHkqE'
);

async function cleanup() {
    console.log('--- Starting Data Cleanup ---');

    // 1. Delete Dummy Projects
    const dummyTitles = ['2014', '2015', '2020', '2021'];
    const { data: delProjects, error: delError } = await supabase
        .from('projects')
        .delete()
        .in('title', dummyTitles);

    if (delError) console.error('Error deleting projects:', delError);
    else console.log('Deleted dummy projects successfully.');

    // 2. Clear existing blocks
    await supabase.from('blocks').delete().not('id', 'is', null);

    // 3. Insert Homepage Blocks
    const homepageBlocks = [
        {
            id: 'hero-1',
            type: 'hero',
            sort_order: 0,
            data: {
                title: 'VINUSPREAD',
                subtitle: 'Redefining Digital Experiences through \nTechnology & Design',
            },
        },
        {
            id: 'philosophy',
            type: 'sticky_split',
            sort_order: 1,
            data: {
                theme: 'dark',
                sticky_content: `
                    <h2 class="text-xl md:text-2xl font-bold mb-8 tracking-tighter text-white/60">Essential Values</h2>
                    <p class="text-5xl md:text-7xl lg:text-9xl leading-[1.0] text-foreground mb-6 font-black tracking-tight" style="word-break: keep-all;">
                    SPREAD<br/>THE BEAUTIFUL<br/>THINGS
                    </p>
                    <p class="text-base text-muted-foreground font-light tracking-wide mb-24">
                    우리는 고객의 본질적 가치에 집중하고 아름다움을 더합니다.<br/>
                    빠르게 변하는 시대 속에서도 변하지 않는 가치에 주목하며,<br/>
                    한계를 뛰어넘는 구조적 아름다움을 만듭니다.
                    </p>
                `,
                values_list: [
                    {
                        title: "THINK",
                        subtitle: "Establish common goals with clients and contemplate together.",
                        description: "고객과 공통된 목표를 설정하고 고민하며, 다양한 선택 속에서 최선의 방법을 제시합니다."
                    },
                    {
                        title: "MIND",
                        subtitle: "Recreating new values suited to the purpose.",
                        description: "우리가 만든 가치가 어제보다 더 아름다운 오늘을 만듭니다. 목적에 맞는 새로운 가치로 재창조합니다."
                    },
                    {
                        title: "BEHAVIOR",
                        subtitle: "Constantly exploring and experimenting without stopping.",
                        description: "멈추지 않고 끊임없이 탐구하고 실험합니다. 본질적인 가치를 표현하려는 즐거운 고민을 즐깁니다."
                    }
                ],
                scroll_content: [
                    { type: 'image', src: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2000' },
                    { type: 'image', src: 'https://images.unsplash.com/photo-1519817650390-64a93db3d648?q=80&w=2000' },
                    { type: 'image', src: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2000' }
                ]
            }
        },
        {
            id: 'business-fields',
            type: 'sticky_split',
            sort_order: 2,
            data: {
                theme: 'light',
                layout: 'background',
                sticky_content: `
                    <h2 class="text-xl md:text-2xl font-bold mb-8 tracking-tighter text-white/60">Field of Business</h2>
                    <p class="text-5xl md:text-7xl lg:text-9xl leading-[1.0] mb-6 font-black tracking-tight" style="word-break: keep-all;">
                    NO BOUNDARY<br/>CREATIVE
                    </p>
                    <p class="text-base text-slate-600 font-light tracking-wide">
                    우리는 시각적 디자인의 다양한 분야를 다루며,<br/>
                    물리적 경계 없는 최고의 결과물을 공유합니다.
                    </p>
                `,
                values_list: [
                    {
                        title: "Website",
                        subtitle: "Developing unified web & mobileUI/UX platforms \nfor successful online business.",
                        description: "통일된 경험의 웹 & 모바일 UI/UX 플랫폼 개발."
                    },
                    {
                        title: "MOBILE APP",
                        subtitle: "Creating optimized layouts and efficient interactions \nfor high-quality apps. iOS, Android, Windows",
                        description: " 환경에 최적화된 어플리케이션."
                    },
                    {
                        title: "Branding",
                        subtitle: "Building strong brand identities that resonate \nwith your target audience. ",
                        description: "브랜드의 핵심 가치를 시각화하여 강력한 인상을 남깁니다."
                    }
                ],
                scroll_content: [
                    { type: 'image', src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000' },
                    { type: 'image', src: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000' },
                    { type: 'image', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000' }
                ]
            }
        },
        {
            id: 'portfolio-gallery',
            type: 'horizontal_gallery',
            sort_order: 3,
            data: {
                title: "MAJOR WORKS",
                view_all_link: "/work",
                items: []
            }
        }
    ];

    const { error: insError } = await supabase
        .from('blocks')
        .insert(homepageBlocks);

    if (insError) console.error('Error inserting blocks:', insError);
    else console.log('Inserted homepage blocks successfully.');

    console.log('--- Cleanup Complete ---');
}

cleanup();
