"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Heart, Star, RotateCcw, Lightbulb, Gift } from "lucide-react"

import { useRewardsSystem, RewardNotification, RewardsDisplay } from "@/components/RewardsSystem"
import { AffirmationFlashcards } from "@/components/AffirmationFlashcards"

interface Tile {
  id: string
  emotion: string
  color: string
  emoji: string
  matched: boolean
  selected: boolean
  row: number
  col: number
  position: { x: number; y: number }
}

interface Affirmation {
  id: string
  text: string
  category: string
  color: string
  emoji: string
}

interface DragState {
  isDragging: boolean
  draggedTile: Tile | null
  startPosition: { x: number; y: number }
  currentPosition: { x: number; y: number }
}

export default function EmotionPuzzlePage() {
  const { userRewards, newUnlocks, addXP, updateAchievementProgress, addPlayTime, updateStreak, clearNewUnlocks } =
    useRewardsSystem()

  const [board, setBoard] = useState<Tile[][]>([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([])
  const [currentAffirmation, setCurrentAffirmation] = useState<string | null>(null)
  const [level, setLevel] = useState(1)
  const [showCelebration, setShowCelebration] = useState(false)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [affirmationsUnlocked, setAffirmationsUnlocked] = useState(0)
  const [earnedAffirmations, setEarnedAffirmations] = useState<Affirmation[]>([])
  const [showFlashcards, setShowFlashcards] = useState(false)
  const [dragState, setDragState] = useState<DragState>({
    isDragging: true,
    draggedTile: null,
    startPosition: { x: 0, y: 0 },
    currentPosition: { x: 0, y: 0 },
  })

  const boardRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)

  const emotions = [
    { name: "joy", color: "#FFD700", emoji: "😊" },
    { name: "calm", color: "#87CEEB", emoji: "😌" },
    { name: "love", color: "#FF69B4", emoji: "💖" },
    { name: "hope", color: "#98FB98", emoji: "🌟" },
    { name: "peace", color: "#DDA0DD", emoji: "☮️" },
    { name: "gratitude", color: "#F0E68C", emoji: "🙏" },
  ]

  const affirmationTemplates = [
    {
      emotions: ["joy"],
      messages: [
        {
          id: "joy-1",
          text: "Joy fills your heart and lights up your world! ✨",
          category: "Joy",
          color: "#FFD700",
          emoji: "😊",
        },
        {
          id: "joy-2",
          text: "Your happiness is a gift to yourself and others around you.",
          category: "Joy",
          color: "#FFD700",
          emoji: "😊",
        },
      ],
    },
    {
      emotions: ["calm"],
      messages: [
        {
          id: "calm-1",
          text: "You are centered, peaceful, and in control. 🧘‍♀️",
          category: "Calm",
          color: "#87CEEB",
          emoji: "😌",
        },
        {
          id: "calm-2",
          text: "In stillness, you find your strength and clarity.",
          category: "Calm",
          color: "#87CEEB",
          emoji: "😌",
        },
      ],
    },
    {
      emotions: ["love"],
      messages: [
        {
          id: "love-1",
          text: "You are worthy of love and capable of giving love. 💕",
          category: "Love",
          color: "#FF69B4",
          emoji: "💖",
        },
        {
          id: "love-2",
          text: "Love flows through you and touches everyone you meet.",
          category: "Love",
          color: "#FF69B4",
          emoji: "💖",
        },
      ],
    },
    {
      emotions: ["hope"],
      messages: [
        {
          id: "hope-1",
          text: "Every new day brings fresh possibilities and hope. 🌅",
          category: "Hope",
          color: "#98FB98",
          emoji: "🌟",
        },
        {
          id: "hope-2",
          text: "Your dreams are valid and within your reach.",
          category: "Hope",
          color: "#98FB98",
          emoji: "🌟",
        },
      ],
    },
    {
      emotions: ["peace"],
      messages: [
        {
          id: "peace-1",
          text: "Inner peace is your natural state of being. 🕊️",
          category: "Peace",
          color: "#DDA0DD",
          emoji: "☮️",
        },
        {
          id: "peace-2",
          text: "You carry tranquility within you wherever you go.",
          category: "Peace",
          color: "#DDA0DD",
          emoji: "☮️",
        },
      ],
    },
    {
      emotions: ["gratitude"],
      messages: [
        {
          id: "gratitude-1",
          text: "Gratitude transforms ordinary moments into blessings. 🌸",
          category: "Gratitude",
          color: "#F0E68C",
          emoji: "🙏",
        },
        {
          id: "gratitude-2",
          text: "Your grateful heart attracts more reasons to be thankful.",
          category: "Gratitude",
          color: "#F0E68C",
          emoji: "🙏",
        },
      ],
    },
  ]

  useEffect(() => {
    initializeBoard()
    updateStreak()
    setSessionStartTime(new Date())

    return () => {
      if (sessionStartTime) {
        const playTime = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 60000)
        addPlayTime(playTime)
      }
    }
  }, [level])

  const initializeBoard = () => {
    const boardSize = Math.min(6 + level, 8)
    const newBoard: Tile[][] = []

    for (let row = 0; row < boardSize; row++) {
      const boardRow: Tile[] = []
      for (let col = 0; col < boardSize; col++) {
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]
        boardRow.push({
          id: `${row}-${col}`,
          emotion: randomEmotion.name,
          color: randomEmotion.color,
          emoji: randomEmotion.emoji,
          matched: false,
          selected: false,
          row,
          col,
          position: { x: col * 56, y: row * 56 }, // 48px tile + 8px gap
        })
      }
      newBoard.push(boardRow)
    }

    setBoard(newBoard)
    setSelectedTiles([])
    setCurrentAffirmation(null)
  }

  const handleMouseDown = (e: React.MouseEvent, tile: Tile) => {
    if (tile.matched) return

    const rect = boardRef.current?.getBoundingClientRect()
    if (!rect) return

    setDragState({
      isDragging: true,
      draggedTile: tile,
      startPosition: { x: e.clientX - rect.left, y: e.clientY - rect.top },
      currentPosition: { x: e.clientX - rect.left, y: e.clientY - rect.top },
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState.isDragging || !dragState.draggedTile) return

    const rect = boardRef.current?.getBoundingClientRect()
    if (!rect) return

    setDragState((prev) => ({
      ...prev,
      currentPosition: { x: e.clientX - rect.left, y: e.clientY - rect.top },
    }))
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!dragState.isDragging || !dragState.draggedTile) return

    const rect = boardRef.current?.getBoundingClientRect()
    if (!rect) return

    const dropX = e.clientX - rect.left
    const dropY = e.clientY - rect.top

    // Find the target position
    const targetCol = Math.round(dropX / 56)
    const targetRow = Math.round(dropY / 56)

    // Check if it's a valid drop position
    if (targetRow >= 0 && targetRow < board.length && targetCol >= 0 && targetCol < board[0].length) {
      const targetTile = board[targetRow][targetCol]

      if (!targetTile.matched) {
        // Swap tiles
        const newBoard = board.map((row) =>
          row.map((tile) => {
            if (tile.id === dragState.draggedTile!.id) {
              return { ...tile, row: targetRow, col: targetCol, position: { x: targetCol * 56, y: targetRow * 56 } }
            } else if (tile.id === targetTile.id) {
              return {
                ...tile,
                row: dragState.draggedTile!.row,
                col: dragState.draggedTile!.col,
                position: { x: dragState.draggedTile!.col * 56, y: dragState.draggedTile!.row * 56 },
              }
            }
            return tile
          }),
        )

        // Update board structure
        const restructuredBoard: Tile[][] = Array(board.length)
          .fill(null)
          .map(() => Array(board[0].length).fill(null))
        newBoard.flat().forEach((tile) => {
          restructuredBoard[tile.row][tile.col] = tile
        })

        setBoard(restructuredBoard)
        setMoves((prev) => prev + 1)

        // Check for matches after move
        setTimeout(() => checkForMatches(restructuredBoard), 100)
      }
    }

    setDragState({
      isDragging: false,
      draggedTile: null,
      startPosition: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 0 },
    })
  }

  const handleTileClick = (tile: Tile) => {
    if (tile.matched || selectedTiles.length >= 3) return

    const newBoard = board.map((row) => row.map((t) => (t.id === tile.id ? { ...t, selected: !t.selected } : t)))
    setBoard(newBoard)

    if (tile.selected) {
      // Deselect tile
      setSelectedTiles((prev) => prev.filter((t) => t.id !== tile.id))
    } else {
      // Select tile
      const newSelectedTiles = [...selectedTiles, tile]
      setSelectedTiles(newSelectedTiles)

      if (newSelectedTiles.length === 3) {
        checkForMatch(newSelectedTiles)
      }
    }
  }

  const checkForMatches = (currentBoard: Tile[][]) => {
    let hasMatches = false
    const newBoard = currentBoard.map((row) => [...row])

    // Check horizontal matches
    for (let row = 0; row < newBoard.length; row++) {
      for (let col = 0; col <= newBoard[row].length - 3; col++) {
        const tile1 = newBoard[row][col]
        const tile2 = newBoard[row][col + 1]
        const tile3 = newBoard[row][col + 2]

        if (
          !tile1.matched &&
          !tile2.matched &&
          !tile3.matched &&
          tile1.emotion === tile2.emotion &&
          tile2.emotion === tile3.emotion
        ) {
          tile1.matched = true
          tile2.matched = true
          tile3.matched = true
          hasMatches = true

          // Add affirmation
          addAffirmationForEmotion(tile1.emotion)
        }
      }
    }

    // Check vertical matches
    for (let col = 0; col < newBoard[0].length; col++) {
      for (let row = 0; row <= newBoard.length - 3; row++) {
        const tile1 = newBoard[row][col]
        const tile2 = newBoard[row + 1][col]
        const tile3 = newBoard[row + 2][col]

        if (
          !tile1.matched &&
          !tile2.matched &&
          !tile3.matched &&
          tile1.emotion === tile2.emotion &&
          tile2.emotion === tile3.emotion
        ) {
          tile1.matched = true
          tile2.matched = true
          tile3.matched = true
          hasMatches = true

          // Add affirmation
          addAffirmationForEmotion(tile1.emotion)
        }
      }
    }

    if (hasMatches) {
      setBoard(newBoard)
      const baseXP = 15 * level
      addXP(baseXP)
      setScore((prev) => prev + 150 * level)
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 1500)

      // Update achievements
      updateAchievementProgress("puzzle_master", level)

      // Check if level complete
      setTimeout(() => {
        const allMatched = newBoard.every((row) => row.every((tile) => tile.matched))
        if (allMatched) {
          const levelBonus = 50 * level
          addXP(levelBonus)
          setLevel((prev) => prev + 1)

          // Show flashcards after level completion
          if (earnedAffirmations.length > 0) {
            setShowFlashcards(true)
          }

          setTimeout(() => initializeBoard(), 2000)
        }
      }, 1000)
    }
  }

  const checkForMatch = (tiles: Tile[]) => {
    const emotions = tiles.map((t) => t.emotion)
    const isMatch = emotions.every((emotion) => emotion === emotions[0])

    setTimeout(() => {
      if (isMatch) {
        // Mark tiles as matched
        const newBoard = board.map((row) =>
          row.map((tile) => {
            if (tiles.some((t) => t.id === tile.id)) {
              return { ...tile, matched: true, selected: false }
            }
            return { ...tile, selected: false }
          }),
        )
        setBoard(newBoard)

        // Add affirmation
        addAffirmationForEmotion(emotions[0])

        const baseXP = 10 * level
        addXP(baseXP)
        setScore((prev) => prev + 100 * level)
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 1500)

        // Update achievements
        if (level === 1) {
          updateAchievementProgress("emotion_explorer", 1)
        }
        updateAchievementProgress("puzzle_master", level)

        // Check if level complete
        setTimeout(() => {
          const allMatched = newBoard.every((row) => row.every((tile) => tile.matched))
          if (allMatched) {
            const levelBonus = 25 * level
            addXP(levelBonus)
            setLevel((prev) => prev + 1)

            // Show flashcards after level completion
            if (earnedAffirmations.length > 0) {
              setShowFlashcards(true)
            }

            setTimeout(() => initializeBoard(), 2000)
          }
        }, 1000)
      } else {
        // Clear selection
        const newBoard = board.map((row) => row.map((tile) => ({ ...tile, selected: false })))
        setBoard(newBoard)
      }

      setSelectedTiles([])
      setMoves((prev) => prev + 1)
    }, 500)
  }

  const addAffirmationForEmotion = (emotion: string) => {
    const template = affirmationTemplates.find((t) => t.emotions.includes(emotion))
    if (template) {
      const randomMessage = template.messages[Math.floor(Math.random() * template.messages.length)]

      // Check if we already have this affirmation
      if (!earnedAffirmations.some((a) => a.id === randomMessage.id)) {
        setEarnedAffirmations((prev) => [...prev, randomMessage])
        setCurrentAffirmation(randomMessage.text)
        setTimeout(() => setCurrentAffirmation(null), 3000)

        setAffirmationsUnlocked((prev) => {
          const newCount = prev + 1
          updateAchievementProgress("affirmation_collector", newCount)
          return newCount
        })
      }
    }
  }

  const resetGame = () => {
    setLevel(1)
    setScore(0)
    setMoves(0)
    setEarnedAffirmations([])
    initializeBoard()
  }

  const showFlashcardsManually = () => {
    if (earnedAffirmations.length > 0) {
      setShowFlashcards(true)
    }
  }

  return (
    <div className="h-screen bg-linear-to-b from-[#E8F4FD] to-[#F5F7FA]">
      {/* Reward Notifications */}
      <RewardNotification achievements={newUnlocks} onClose={clearNewUnlocks} />

      {/* Affirmation Flashcards */}
      <AffirmationFlashcards
        isOpen={showFlashcards}
        onClose={() => setShowFlashcards(false)}
        earnedAffirmations={earnedAffirmations}
      />

      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <a href="/games">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
          </a>
          <h1 className="text-xl font-bold text-[#333333] font-poppins">Emotion Puzzle</h1>
          <div className="flex space-x-2">
            {earnedAffirmations.length > 0 && (
              <button
                onClick={showFlashcardsManually}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              >
                <Gift className="w-6 h-6 text-purple-600" />
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {earnedAffirmations.length}
                </span>
              </button>
            )}
            <button onClick={resetGame} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <RotateCcw className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Rewards Display */}
        <div className="mt-4">
          <RewardsDisplay userRewards={userRewards} compact />
        </div>

        {/* Game Stats */}
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center bg-[#4A90E2] bg-opacity-20 px-3 py-2 rounded-full">
            <Star className="w-4 h-4 text-[#4A90E2] mr-2" />
            <span className="font-medium text-[#333333]">Level {level}</span>
          </div>
          <div className="flex items-center bg-[#A3D8C6] bg-opacity-20 px-3 py-2 rounded-full">
            <Heart className="w-4 h-4 text-[#A3D8C6] mr-2" />
            <span className="font-medium text-[#333333]">{score}</span>
          </div>
          <div className="flex items-center bg-[#FF6F61] bg-opacity-20 px-3 py-2 rounded-full">
            <span className="font-medium text-[#333333]">{moves} moves</span>
          </div>
        </div>
      </header>

      {/* Celebration */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="text-6xl animate-bounce">✨</div>
        </div>
      )}

      {/* Affirmation */}
      {currentAffirmation && (
        <div className="fixed top-20 left-4 right-4 z-40">
          <div className="bg-gradient-to-r from-[#4A90E2] to-[#A3D8C6] text-white p-4 rounded-2xl shadow-lg animate-slide-up">
            <p className="text-center font-lora italic">{currentAffirmation}</p>
          </div>
        </div>
      )}

      <main className="p-6">
        {/* Instructions */}
        <div className="card mb-6 bg-gradient-to-r from-[#A3D8C6] to-[#4A90E2] text-white">
          <div className="flex items-start">
            <Lightbulb className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2 font-poppins">How to Play</h3>
              <p className="text-sm font-lora opacity-90">
                🎯 <strong>Click</strong> to select 3 tiles with the same emotion, or <strong>drag & drop</strong> tiles
                to create matches of 3 in a row! Earn beautiful affirmations with each match.
              </p>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="flex justify-center mb-6">
          <div
            ref={boardRef}
            className="relative p-4 bg-white rounded-2xl shadow-lg"
            style={{
              width: `${board.length * 56 + 32}px`,
              height: `${board.length * 56 + 32}px`,
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Grid background */}
            <div
              className="absolute inset-4 grid gap-2 pointer-events-none"
              style={{
                gridTemplateColumns: `repeat(${board.length}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: board.length * board.length }).map((_, index) => (
                <div key={index} className="w-12 h-12 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300" />
              ))}
            </div>

            {/* Tiles */}
            {board.flat().map((tile) => (
              <button
                key={tile.id}
                onMouseDown={(e) => handleMouseDown(e, tile)}
                onClick={() => handleTileClick(tile)}
                disabled={tile.matched}
                className={`
                  absolute w-12 h-12 rounded-lg transition-all duration-200 flex items-center justify-center text-lg z-10
                  ${tile.matched ? "opacity-30 cursor-not-allowed" : "hover:scale-105 cursor-pointer shadow-md"}
                  ${tile.selected ? "ring-4 ring-blue-400 scale-105" : ""}
                  ${dragState.draggedTile?.id === tile.id ? "z-50 shadow-2xl scale-110" : ""}
                `}
                style={{
                  backgroundColor: tile.matched ? "#f0f0f0" : tile.color,
                  opacity: tile.matched ? 0.3 : 1,
                  left:
                    dragState.draggedTile?.id === tile.id
                      ? `${dragState.currentPosition.x - 24}px`
                      : `${tile.position.x + 16}px`,
                  top:
                    dragState.draggedTile?.id === tile.id
                      ? `${dragState.currentPosition.y - 24}px`
                      : `${tile.position.y + 16}px`,
                  transform: dragState.draggedTile?.id === tile.id ? "rotate(5deg)" : "none",
                }}
              >
                <span className={tile.matched ? "grayscale" : ""}>{tile.emoji}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Tiles */}
        {selectedTiles.length > 0 && (
          <div className="card mb-6">
            <h3 className="font-semibold text-[#333333] font-poppins mb-3">Selected Emotions</h3>
            <div className="flex justify-center space-x-4">
              {selectedTiles.map((tile, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-lg mb-2"
                    style={{ backgroundColor: tile.color }}
                  >
                    {tile.emoji}
                  </div>
                  <span className="text-sm text-[#666666] capitalize">{tile.emotion}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-[#666666] mt-3">
              {selectedTiles.length === 3
                ? "Checking for match..."
                : `Select ${3 - selectedTiles.length} more tile${3 - selectedTiles.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        )}

        {/* Affirmations Earned */}
        {earnedAffirmations.length > 0 && (
          <div className="card mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[#333333] font-poppins">Affirmations Earned</h3>
              <button
                onClick={showFlashcardsManually}
                className="flex items-center space-x-2 px-3 py-1 bg-purple-100 hover:bg-purple-200 rounded-full transition-colors"
              >
                <Gift className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-600">View All</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {earnedAffirmations.slice(-3).map((affirmation, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-3 py-2 rounded-full text-sm"
                  style={{ backgroundColor: affirmation.color + "20" }}
                >
                  <span>{affirmation.emoji}</span>
                  <span className="text-gray-700">{affirmation.category}</span>
                </div>
              ))}
              {earnedAffirmations.length > 3 && (
                <div className="flex items-center px-3 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
                  +{earnedAffirmations.length - 3} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Emotion Guide */}
        <div className="card">
          <h3 className="font-semibold text-[#333333] font-poppins mb-3">Emotion Guide</h3>
          <div className="grid grid-cols-2 gap-3">
            {emotions.map((emotion) => (
              <div key={emotion.name} className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: emotion.color }}
                >
                  {emotion.emoji}
                </div>
                <span className="text-sm font-medium text-[#333333] capitalize">{emotion.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6 card">
          <h3 className="font-semibold text-[#333333] font-poppins mb-3">Your Progress</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#4A90E2] font-poppins">{level}</div>
              <div className="text-sm text-[#666666]">Level</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#A3D8C6] font-poppins">{score}</div>
              <div className="text-sm text-[#666666]">Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#FF6F61] font-poppins">{earnedAffirmations.length}</div>
              <div className="text-sm text-[#666666]">Affirmations</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
