import { Link } from 'react-router-dom'

// Each topic label is mapped to its exact route ID
const STAGES = [
  {
    num: 1, title: 'Java Fundamentals', color: '#f97316', link: 'introduction',
    desc: 'Start from scratch — learn Java syntax, variables, data types, operators, control flow, loops, arrays, strings and methods.',
    time: '1–2 weeks', level: 'Beginner 🌱',
    topics: [
      { label: 'Introduction to Java', id: 'introduction'  },
      { label: 'Variables & Types',    id: 'variables'     },
      { label: 'Data Types',           id: 'datatypes'     },
      { label: 'Operators',            id: 'operators'     },
      { label: 'Control Flow',         id: 'control-flow'  },
      { label: 'Loops',                id: 'loops'         },
      { label: 'Arrays',               id: 'arrays'        },
      { label: 'Strings',              id: 'strings'       },
      { label: 'Methods',              id: 'methods'       },
      { label: 'Input / Output',       id: 'input-output'  },
    ],
  },
  {
    num: 2, title: 'Object-Oriented Programming', color: '#38bdf8', link: 'classes-objects',
    desc: 'The heart of Java — master classes, objects, inheritance, polymorphism, encapsulation, abstraction and interfaces.',
    time: '2–3 weeks', level: 'Beginner → Intermediate',
    topics: [
      { label: 'Classes & Objects', id: 'classes-objects' },
      { label: 'Constructors',      id: 'constructors'    },
      { label: 'Inheritance',       id: 'inheritance'     },
      { label: 'Polymorphism',      id: 'polymorphism'    },
      { label: 'Abstraction',       id: 'abstraction'     },
      { label: 'Encapsulation',     id: 'encapsulation'   },
      { label: 'Interfaces',        id: 'interfaces'      },
      { label: 'Static Keyword',    id: 'static-keyword'  },
    ],
  },
  {
    num: 3, title: 'Collections Framework', color: '#4ade80', link: 'collections-intro',
    desc: 'Store and manipulate data efficiently — ArrayList, LinkedList, HashMap, HashSet, TreeMap, queues and iterators.',
    time: '1–2 weeks', level: 'Intermediate ⚡',
    topics: [
      { label: 'Collections Overview', id: 'collections-intro' },
      { label: 'ArrayList',            id: 'arraylist'         },
      { label: 'LinkedList',           id: 'linkedlist'        },
      { label: 'HashMap',              id: 'hashmap'           },
      { label: 'TreeMap',              id: 'treemap'           },
      { label: 'HashSet',              id: 'hashset'           },
      { label: 'Stack & Queue',        id: 'stack-queue'       },
      { label: 'Iterators',            id: 'iterators'         },
    ],
  },
  {
    num: 4, title: 'Exception Handling', color: '#f87171', link: 'exceptions-intro',
    desc: 'Write crash-proof programs — try-catch-finally, checked vs unchecked, custom exceptions and best practices.',
    time: '3–5 days', level: 'Intermediate',
    topics: [
      { label: 'Exception Types',    id: 'exceptions-intro'  },
      { label: 'try-catch-finally',  id: 'try-catch'         },
      { label: 'finally Block',      id: 'finally'           },
      { label: 'throw & throws',     id: 'throw-throws'      },
      { label: 'Custom Exceptions',  id: 'custom-exceptions' },
    ],
  },
  {
    num: 5, title: 'Java 8+ Modern Features', color: '#c084fc', link: 'lambda',
    desc: 'Write modern, concise Java — lambda expressions, Stream API, Optional, method references, and the new Date/Time API.',
    time: '2–3 weeks', level: 'Intermediate → Advanced 🚀',
    topics: [
      { label: 'Lambda Expressions',   id: 'lambda'                },
      { label: 'Functional Interfaces',id: 'functional-interfaces' },
      { label: 'Stream API',           id: 'streams'               },
      { label: 'Optional',             id: 'optional'              },
      { label: 'Default Methods',      id: 'default-methods'       },
      { label: 'Method References',    id: 'method-references'     },
      { label: 'Date & Time API',      id: 'date-time'             },
    ],
  },
  {
    num: 6, title: 'Multithreading & Concurrency', color: '#fbbf24', link: 'threads-intro',
    desc: 'Run code in parallel safely — threads, synchronization, locks, ExecutorService, CompletableFuture and concurrent collections.',
    time: '2–3 weeks', level: 'Advanced 🚀',
    topics: [
      { label: 'Threads Introduction',    id: 'threads-intro'          },
      { label: 'Thread Lifecycle',        id: 'thread-lifecycle'       },
      { label: 'Synchronization',         id: 'synchronization'        },
      { label: 'ExecutorService',         id: 'executor-service'       },
      { label: 'CompletableFuture',       id: 'completable-future'     },
      { label: 'Concurrent Collections',  id: 'concurrent-collections' },
    ],
  },
  {
    num: 7, title: 'Advanced Java', color: '#f97316', link: 'generics',
    desc: 'Deep-dive into powerful Java features — generics, annotations, design patterns, and File I/O.',
    time: '2–3 weeks', level: 'Advanced',
    topics: [
      { label: 'Generics',         id: 'generics'         },
      { label: 'Annotations',      id: 'annotations'      },
      { label: 'Design Patterns',  id: 'design-patterns'  },
      { label: 'File I/O',         id: 'file-io'          },
    ],
  },
  {
    num: 8, title: 'Interview Preparation', color: '#38bdf8', link: 'interview-core',
    desc: 'Crack any Java interview — comprehensive Q&A for core Java, OOP, collections, Java 8, DSA and more.',
    time: 'Ongoing', level: 'All Levels 💼',
    topics: [
      { label: 'Core Java Q&A',         id: 'interview-core'        },
      { label: 'OOP Q&A',               id: 'interview-oop'         },
      { label: 'Collections Q&A',       id: 'interview-collections' },
      { label: 'Java 8 Q&A',            id: 'interview-java8'       },
      { label: 'DSA — Arrays',          id: 'dsa-arrays'            },
      { label: 'DSA — Strings',         id: 'dsa-strings'           },
      { label: 'DSA — Linked Lists',    id: 'dsa-linkedlist'        },
      { label: 'DSA — Trees',           id: 'dsa-trees'             },
      { label: 'DSA — Sorting',         id: 'dsa-sorting'           },
      { label: 'Dynamic Programming',   id: 'dsa-dynamic-programming' },
    ],
  },
]

export default function RoadmapPage({ progress }) {
  return (
    <div style={{ minHeight:'100%', background:'var(--bg)' }}>

      {/* Header */}
      <div style={{ background:'var(--surface)', borderBottom:'1px solid var(--border)', padding:'28px 32px 24px' }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:800, color:'var(--heading)', marginBottom:8, letterSpacing:'-0.03em' }}>
          🗺️ Java Learning Roadmap
        </h1>
        <p style={{ color:'var(--text-muted)', fontSize:14.5, fontFamily:'var(--font-body)' }}>
          Your complete path — from absolute beginner to job-ready Java developer. Click any topic to start learning.
        </p>
      </div>

      <div style={{ padding:'32px', maxWidth:820 }}>
        {STAGES.map((stage, i) => {
          const isStarted   = progress[stage.link]
          const doneCount   = stage.topics.filter(t => progress[t.id]).length
          const totalTopics = stage.topics.length

          return (
            <div key={i} style={{ display:'flex', gap:0 }}>

              {/* Timeline column */}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:52, flexShrink:0 }}>
                <div style={{
                  width:40, height:40, borderRadius:'50%',
                  background: doneCount === totalTopics ? stage.color : doneCount > 0 ? `${stage.color}44` : 'var(--card)',
                  border:`2px solid ${stage.color}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:'var(--font-display)', fontWeight:800, fontSize:15,
                  color: doneCount === totalTopics ? '#000' : stage.color,
                  zIndex:1, flexShrink:0, transition:'all 0.3s',
                  boxShadow: doneCount > 0 ? `0 0 16px ${stage.color}55` : 'none',
                }}>
                  {doneCount === totalTopics ? '✓' : stage.num}
                </div>
                {i < STAGES.length - 1 && (
                  <div style={{ width:2, flex:1, background:`linear-gradient(180deg,${stage.color}88,${STAGES[i+1].color}44)`, minHeight:24, marginTop:4 }} />
                )}
              </div>

              {/* Stage card */}
              <div style={{ flex:1, paddingLeft:16, paddingBottom: i < STAGES.length - 1 ? 28 : 0 }}>
                <div style={{
                  background:'var(--card)',
                  border:`1px solid ${doneCount > 0 ? stage.color+'44' : 'var(--border)'}`,
                  borderRadius:16, padding:'20px 24px',
                  position:'relative', overflow:'hidden',
                  transition:'border-color 0.2s',
                }}>
                  {/* Top colour bar */}
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${stage.color},${stage.color}44)` }} />

                  {/* Stage header */}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10, flexWrap:'wrap', gap:8, marginTop:4 }}>
                    <div>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:800, color: doneCount > 0 ? stage.color : 'var(--heading)', fontSize:17, marginBottom:6 }}>
                        {stage.title}
                      </div>
                      <div style={{ display:'flex', gap:7, flexWrap:'wrap', alignItems:'center' }}>
                        <span style={{ background:`${stage.color}14`, color:stage.color, border:`1px solid ${stage.color}33`, borderRadius:6, padding:'2px 9px', fontSize:11, fontWeight:700, fontFamily:'var(--font-display)' }}>
                          {stage.level}
                        </span>
                        <span style={{ background:'var(--card2)', color:'var(--text-muted)', border:'1px solid var(--border)', borderRadius:6, padding:'2px 9px', fontSize:11, fontWeight:600, fontFamily:'var(--font-display)' }}>
                          ⏱ {stage.time}
                        </span>
                        {doneCount > 0 && (
                          <span style={{ background:'rgba(63,185,80,0.1)', color:'#3fb950', border:'1px solid rgba(63,185,80,0.3)', borderRadius:6, padding:'2px 9px', fontSize:11, fontWeight:700, fontFamily:'var(--font-display)' }}>
                            ✅ {doneCount}/{totalTopics} done
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Go to first topic arrow */}
                    <Link to={`/learn/${stage.link}`}
                      style={{ color:'var(--text-muted)', fontSize:20, textDecoration:'none', transition:'color 0.15s', flexShrink:0, padding:'4px 8px', borderRadius:8 }}
                      onMouseEnter={e => e.currentTarget.style.color = stage.color}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                      title={`Start ${stage.title}`}>
                      →
                    </Link>
                  </div>

                  <p style={{ color:'var(--text-muted)', fontSize:13.5, lineHeight:1.7, marginBottom:16, fontFamily:'var(--font-body)' }}>
                    {stage.desc}
                  </p>

                  {/* ── Clickable topic tags ── */}
                  <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                    {stage.topics.map((topic, j) => {
                      const isDone = progress[topic.id]
                      return (
                        <Link
                          key={j}
                          to={`/learn/${topic.id}`}
                          title={`Go to: ${topic.label}`}
                          style={{
                            background: isDone ? 'rgba(63,185,80,0.12)' : `${stage.color}12`,
                            color:      isDone ? '#3fb950'               : stage.color,
                            border:     `1px solid ${isDone ? 'rgba(63,185,80,0.35)' : stage.color + '2a'}`,
                            borderRadius:7, padding:'5px 12px',
                            fontSize:12, fontWeight:600,
                            fontFamily:'var(--font-display)',
                            textDecoration:'none',
                            display:'inline-flex', alignItems:'center', gap:5,
                            transition:'all 0.15s',
                            cursor:'pointer',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background    = isDone ? 'rgba(63,185,80,0.22)' : `${stage.color}28`
                            e.currentTarget.style.borderColor   = isDone ? 'rgba(63,185,80,0.6)'  : stage.color
                            e.currentTarget.style.transform     = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow     = `0 4px 12px ${isDone ? 'rgba(63,185,80,0.25)' : stage.color + '33'}`
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background  = isDone ? 'rgba(63,185,80,0.12)' : `${stage.color}12`
                            e.currentTarget.style.borderColor = isDone ? 'rgba(63,185,80,0.35)' : stage.color + '2a'
                            e.currentTarget.style.transform   = 'translateY(0)'
                            e.currentTarget.style.boxShadow  = 'none'
                          }}
                        >
                          {isDone && <span style={{ fontSize:9 }}>✓</span>}
                          {topic.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Tips */}
        <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:16, padding:'22px 26px', marginTop:16 }}>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'var(--heading)', fontSize:15, marginBottom:12 }}>💡 Tips for Success</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:10 }}>
            {[
              { icon:'📖', tip:'Read theory first, then run the code examples' },
              { icon:'🧠', tip:'Take the quiz after every topic to test yourself' },
              { icon:'✍️', tip:'Type out the code yourself — don\'t just copy-paste' },
              { icon:'🔄', tip:'Revisit topics you found difficult after a few days' },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'10px 14px', background:'var(--card2)', border:'1px solid var(--border)', borderRadius:10 }}>
                <span style={{ fontSize:18, flexShrink:0 }}>{item.icon}</span>
                <span style={{ fontSize:13, color:'var(--text)', lineHeight:1.6, fontFamily:'var(--font-body)' }}>{item.tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
