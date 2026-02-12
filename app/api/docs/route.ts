import { NextResponse } from 'next/server';

// API 문서 HTML 생성
export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>VINUSPREAD API Documentation</title>
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@3.52.5/swagger-ui.css" />
      <style>
        body { 
          margin: 0; 
          padding: 0; 
          background: #1a1a1a;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info { 
          margin: 50px 0; 
          background: #2a2a2a;
          border-radius: 8px;
        }
        .swagger-ui .scheme-container { 
          margin: 0 0 50px 0; 
          background: #2a2a2a;
          border-radius: 8px;
        }
        .swagger-ui .opblock.opblock-tag-section {
          background: #2a2a2a;
          border-color: #3a3a3a;
        }
        .swagger-ui .opblock.opblock {
          background: #2a2a2a;
          border-color: #3a3a3a;
        }
        .swagger-ui .opblock.opblock.get {
          border-color: #61affe;
          background: rgba(97, 175, 254, 0.1);
        }
        .swagger-ui .opblock.opblock.post {
          border-color: #49cc90;
          background: rgba(73, 204, 144, 0.1);
        }
        .swagger-ui .opblock.opblock.put {
          border-color: #fca130;
          background: rgba(252, 161, 48, 0.1);
        }
        .swagger-ui .opblock.opblock.delete {
          border-color: #f93e3e;
          background: rgba(249, 62, 62, 0.1);
        }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@3.52.5/swagger-ui-bundle.js"></script>
      <script src="https://unpkg.com/swagger-ui-dist@3.52.5/swagger-ui-standalone-preset.js"></script>
      <script>
        // API 스펙 정의
        const spec = {
          openapi: '3.0.0',
          info: {
            title: 'VINUSPREAD API',
            version: '1.0.0',
            description: 'VINUSPREAD 프로젝트를 위한 REST API 문서\\n\\n🎯 주요 기능:\\n- 프로젝트 관리\\n- 스토리 관리\\n- 문의사항 관리\\n- 통계 정보 조회\\n\\n📱 텔레그램 알림 연동됨',
            contact: {
              name: 'API Support',
              email: 'support@vinuspread.com'
            }
          },
          servers: [
            {
              url: 'http://localhost:3000',
              description: 'Development'
            }
          ],
          paths: {
            '/api/projects': {
              get: {
                summary: '모든 프로젝트 조회',
                description: '등록된 모든 프로젝트를 가져옵니다',
                responses: {
                  '200': {
                    description: '프로젝트 목록',
                    content: {
                      'application/json': {
                        schema: {
                          type: 'object',
                          properties: {
                            success: { type: 'boolean' },
                            data: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  id: { type: 'string', description: '프로젝트 ID' },
                                  title: { type: 'string', description: '제목' },
                                  description: { type: 'string', description: '설명' },
                                  category: { type: 'string', description: '카테고리' },
                                  client: { type: 'string', description: '클라이언트' },
                                  year: { type: 'string', description: '년도' },
                                  image: { type: 'string', description: '이미지 URL' },
                                  motion_type: { 
                                    type: 'string', 
                                    enum: ['fade', 'slide-up', 'reveal', 'zoom', 'none'],
                                    description: '애니메이션 타입'
                                  },
                                  sort_order: { type: 'integer', description: '정렬 순서' },
                                  created_at: { type: 'string', format: 'date-time' }
                                }
                              }
                            },
                            count: { type: 'integer' }
                          }
                        }
                      }
                    }
                  }
                },
                post: {
                  summary: '새 프로젝트 생성',
                  description: '새로운 프로젝트를 생성합니다',
                  requestBody: {
                    required: true,
                    content: {
                      'application/json': {
                        schema: {
                          type: 'object',
                          required: ['title'],
                          properties: {
                            title: { type: 'string', description: '제목 (필수)' },
                            description: { type: 'string', description: '설명' },
                            category: { type: 'string', description: '카테고리' },
                            client: { type: 'string', description: '클라이언트' },
                            year: { type: 'string', description: '년도' },
                            motion_type: { 
                              type: 'string', 
                              enum: ['fade', 'slide-up', 'reveal', 'zoom', 'none'],
                              description: '애니메이션 타입'
                            },
                            sort_order: { type: 'integer', description: '정렬 순서' }
                          }
                        }
                      }
                    }
                  },
                  responses: {
                    '201': {
                      description: '프로젝트 생성 성공',
                      content: {
                        'application/json': {
                          schema: {
                            type: 'object',
                            properties: {
                              success: { type: 'boolean' },
                              data: { type: 'object' }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              '/api/stories': {
                get: {
                  summary: '모든 스토리 조회',
                  description: '등록된 모든 스토리를 가져옵니다',
                  responses: {
                    '200': {
                      description: '스토리 목록',
                      content: {
                        'application/json': {
                          schema: {
                            type: 'object',
                            properties: {
                              success: { type: 'boolean' },
                              data: {
                                type: 'array',
                                items: {
                                  type: 'object',
                                  properties: {
                                    id: { type: 'string', description: '스토리 ID' },
                                    title: { type: 'string', description: '제목' },
                                    excerpt: { type: 'string', description: '요약' },
                                    category: { type: 'string', description: '카테고리' },
                                    image: { type: 'string', description: '이미지 URL' },
                                    content: { type: 'string', description: '내용' },
                                    status: { 
                                      type: 'string', 
                                      enum: ['draft', 'published'],
                                      description: '상태'
                                    },
                                    published_date: { type: 'string', format: 'date' },
                                    created_at: { type: 'string', format: 'date-time' }
                                  }
                                }
                              },
                              count: { type: 'integer' }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                post: {
                  summary: '새 스토리 생성',
                  description: '새로운 스토리를 생성합니다',
                  requestBody: {
                    required: true,
                    content: {
                      'application/json': {
                        schema: {
                          type: 'object',
                          required: ['title'],
                          properties: {
                            title: { type: 'string', description: '제목 (필수)' },
                            excerpt: { type: 'string', description: '요약' },
                            category: { type: 'string', description: '카테고리' },
                            content: { type: 'string', description: '내용' },
                            status: { 
                              type: 'string', 
                              enum: ['draft', 'published'],
                              description: '상태'
                            },
                            published_date: { type: 'string', format: 'date' }
                          }
                        }
                      }
                    }
                  },
                  responses: {
                    '201': {
                      description: '스토리 생성 성공',
                      content: {
                        'application/json': {
                          schema: {
                            type: 'object',
                            properties: {
                              success: { type: 'boolean' },
                              data: { type: 'object' }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              '/api/inquiries': {
                get: {
                  summary: '모든 문의사항 조회',
                  description: '접수된 모든 문의사항을 가져옵니다',
                  responses: {
                    '200': {
                      description: '문의사항 목록',
                      content: {
                        'application/json': {
                          schema: {
                            type: 'object',
                            properties: {
                              success: { type: 'boolean' },
                              data: {
                                type: 'array',
                                items: {
                                  type: 'object',
                                  properties: {
                                    id: { type: 'string', description: '문의 ID' },
                                    name: { type: 'string', description: '이름' },
                                    email: { type: 'string', format: 'email', description: '이메일' },
                                    phone: { type: 'string', description: '전화번호' },
                                    company: { type: 'string', description: '회사' },
                                    subject: { type: 'string', description: '제목' },
                                    message: { type: 'string', description: '내용' },
                                    status: { 
                                      type: 'string', 
                                      enum: ['pending', 'in_progress', 'completed'],
                                      description: '처리상태'
                                    },
                                    created_at: { type: 'string', format: 'date-time' }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                post: {
                  summary: '새 문의사항 생성',
                  description: '새로운 문의사항을 접수합니다',
                  requestBody: {
                    required: true,
                    content: {
                      'application/json': {
                        schema: {
                          type: 'object',
                          required: ['name', 'email', 'message'],
                          properties: {
                            name: { type: 'string', description: '이름 (필수)' },
                            email: { type: 'string', format: 'email', description: '이메일 (필수)' },
                            phone: { type: 'string', description: '전화번호' },
                            company: { type: 'string', description: '회사' },
                            subject: { type: 'string', description: '제목' },
                            message: { type: 'string', description: '내용 (필수)' }
                          }
                        }
                      }
                    }
                  },
                  responses: {
                    '201': {
                      description: '문의 접수 성공',
                      content: {
                        'application/json': {
                          schema: {
                            type: 'object',
                            properties: {
                              success: { type: 'boolean' },
                              data: { type: 'object' },
                              message: { type: 'string' }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              '/api/stats': {
                get: {
                  summary: '시스템 통계 조회',
                  description: '시스템 전체 통계 정보를 가져옵니다',
                  responses: {
                    '200': {
                      description: '통계 정보',
                      content: {
                        'application/json': {
                          schema: {
                            type: 'object',
                            properties: {
                              success: { type: 'boolean' },
                              data: {
                                type: 'object',
                                properties: {
                                  projects: { type: 'integer', description: '프로젝트 수' },
                                  stories: { type: 'integer', description: '스토리 수' },
                                  media: { type: 'integer', description: '미디어 수' },
                                  inquiries: { type: 'integer', description: '문의 수' },
                                  labItems: { type: 'integer', description: '랩 아이템 수' },
                                  lastUpdated: { type: 'string', format: 'date-time', description: '마지막 업데이트' }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            tags: [
              {
                name: 'Projects',
                description: '프로젝트 관리 API'
              },
              {
                name: 'Stories', 
                description: '스토리 관리 API'
              },
              {
                name: 'Inquiries',
                description: '문의사항 관리 API'
              },
              {
                name: 'Stats',
                description: '통계 정보 API'
              }
            ]
          };

        window.onload = function() {
          const ui = SwaggerUIBundle({
            spec: spec,
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            plugins: [
              SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout",
            defaultModelsExpandDepth: 2,
            defaultModelExpandDepth: 2,
            docExpansion: "list"
          });
        }
      </script>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}