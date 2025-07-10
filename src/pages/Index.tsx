import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chats");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "Мама",
      text: "Привет всем! 👋",
      time: "2 мин назад",
      avatar: "М",
    },
  ]);
  const [user, setUser] = useState({
    name: "dima",
    isOwner: true,
    description: "Основатель FamilyChat",
    avatar: "/placeholder.svg",
  });
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ username: "", password: "" });

  // Mock data
  const chats = [
    {
      id: 1,
      name: "Семейная группа",
      lastMessage: "Привет всем! 👋",
      time: "2 мин",
      unread: 3,
      avatar: "👨‍👩‍👧‍👦",
    },
    {
      id: 2,
      name: "Работа",
      lastMessage: "Встреча завтра в 10:00",
      time: "15 мин",
      unread: 1,
      avatar: "💼",
    },
    {
      id: 3,
      name: "Друзья",
      lastMessage: "Кто идет в кино?",
      time: "1 час",
      unread: 0,
      avatar: "🎬",
    },
  ];

  const channels = [
    {
      id: 1,
      name: "Технологии",
      subscribers: "1.2K",
      description: "Новости из мира IT",
      avatar: "⚡",
    },
    {
      id: 2,
      name: "Кулинария",
      subscribers: "890",
      description: "Рецепты и советы",
      avatar: "🍳",
    },
    {
      id: 3,
      name: "Спорт",
      subscribers: "2.5K",
      description: "Спортивные новости",
      avatar: "⚽",
    },
  ];

  const videos = [
    {
      id: 1,
      title: "Как готовить плов",
      views: "45K",
      duration: "12:30",
      thumbnail: "🍚",
      isLive: false,
    },
    {
      id: 2,
      title: "Прямая трансляция",
      views: "123",
      duration: "LIVE",
      thumbnail: "🔴",
      isLive: true,
    },
    {
      id: 3,
      title: "Короткое видео #1",
      views: "2.1K",
      duration: "0:45",
      thumbnail: "📱",
      isLive: false,
    },
  ];

  const handleLogin = () => {
    if (authForm.username === "dima" && authForm.password === "38674128dima") {
      setIsLoggedIn(true);
      setUser({
        name: "dima",
        isOwner: true,
        description: "Основатель FamilyChat",
        avatar: "/placeholder.svg",
      });
    } else {
      alert("Неверный логин или пароль");
    }
  };

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        author: user.name,
        text: currentMessage,
        time: "сейчас",
        avatar: user.name.charAt(0).toUpperCase(),
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coral/10 via-mint/10 to-ocean/10 font-roboto flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-md border-coral/20">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-coral to-mint rounded-lg flex items-center justify-center">
                <Icon name="MessageCircle" size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-montserrat font-bold bg-gradient-to-r from-coral to-mint bg-clip-text text-transparent">
                FamilyChat
              </h1>
            </div>
            <CardTitle className="text-2xl">
              {authMode === "login" ? "Вход" : "Регистрация"}
            </CardTitle>
            <CardDescription>
              {authMode === "login"
                ? "Войдите в свой аккаунт"
                : "Создайте новый аккаунт"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                id="username"
                type="text"
                placeholder="Введите имя пользователя"
                value={authForm.username}
                onChange={(e) =>
                  setAuthForm({ ...authForm, username: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={authForm.password}
                onChange={(e) =>
                  setAuthForm({ ...authForm, password: e.target.value })
                }
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-coral to-mint hover:from-coral/90 hover:to-mint/90"
            >
              {authMode === "login" ? "Войти" : "Зарегистрироваться"}
            </Button>
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() =>
                  setAuthMode(authMode === "login" ? "register" : "login")
                }
                className="text-coral hover:text-coral/90"
              >
                {authMode === "login"
                  ? "Нет аккаунта? Зарегистрируйтесь"
                  : "Уже есть аккаунт? Войдите"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral/10 via-mint/10 to-ocean/10 font-roboto">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-coral/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-coral to-mint rounded-lg flex items-center justify-center">
                  <Icon name="MessageCircle" size={20} className="text-white" />
                </div>
                <h1 className="text-2xl font-montserrat font-bold bg-gradient-to-r from-coral to-mint bg-clip-text text-transparent">
                  FamilyChat
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-coral/10">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-coral/10">
                <Icon name="Bell" size={20} />
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-coral to-mint text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium">{user.name}</span>
                  {user.isOwner && (
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-coral to-mint text-white text-xs"
                    >
                      ★ Владелец
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLoggedIn(false)}
                className="text-red-500 hover:text-red-600"
              >
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/50 backdrop-blur-md">
            <TabsTrigger value="chats" className="flex items-center space-x-2">
              <Icon name="MessageCircle" size={16} />
              <span>Чаты</span>
            </TabsTrigger>
            <TabsTrigger
              value="channels"
              className="flex items-center space-x-2"
            >
              <Icon name="Radio" size={16} />
              <span>Каналы</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center space-x-2">
              <Icon name="Video" size={16} />
              <span>Видео</span>
            </TabsTrigger>
            <TabsTrigger value="calls" className="flex items-center space-x-2">
              <Icon name="Phone" size={16} />
              <span>Звонки</span>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex items-center space-x-2"
            >
              <Icon name="User" size={16} />
              <span>Профиль</span>
            </TabsTrigger>
          </TabsList>

          {/* Chats Tab */}
          <TabsContent value="chats" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat List */}
              <div className="lg:col-span-1">
                <Card className="bg-white/80 backdrop-blur-md border-coral/20">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Чаты</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-coral to-mint hover:from-coral/90 hover:to-mint/90"
                          >
                            <Icon name="Plus" size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Создать группу</DialogTitle>
                            <DialogDescription>
                              Создайте новую группу для общения
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="group-name">
                                Название группы
                              </Label>
                              <Input
                                id="group-name"
                                placeholder="Введите название группы"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="group-description">
                                Описание
                              </Label>
                              <Textarea
                                id="group-description"
                                placeholder="Описание группы"
                              />
                            </div>
                            <Button className="w-full bg-gradient-to-r from-coral to-mint hover:from-coral/90 hover:to-mint/90">
                              Создать группу
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {chats.map((chat) => (
                        <div
                          key={chat.id}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-coral/5 cursor-pointer transition-colors"
                        >
                          <div className="text-2xl">{chat.avatar}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-sm truncate">
                                {chat.name}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">
                                  {chat.time}
                                </span>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <Icon name="UserPlus" size={14} />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Добавить в группу
                                      </DialogTitle>
                                      <DialogDescription>
                                        Пригласите пользователей в группу "
                                        {chat.name}"
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="invite-user">
                                          Имя пользователя
                                        </Label>
                                        <Input
                                          id="invite-user"
                                          placeholder="Введите имя пользователя"
                                        />
                                      </div>
                                      <Button className="w-full bg-gradient-to-r from-coral to-mint hover:from-coral/90 hover:to-mint/90">
                                        Отправить приглашение
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 truncate">
                              {chat.lastMessage}
                            </p>
                          </div>
                          {chat.unread > 0 && (
                            <Badge className="bg-coral text-white text-xs">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chat Area */}
              <div className="lg:col-span-2">
                <Card className="bg-white/80 backdrop-blur-md border-coral/20 h-96">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">👨‍👩‍👧‍👦</div>
                        <div>
                          <h3 className="font-medium">Семейная группа</h3>
                          <p className="text-sm text-gray-500">4 участника</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Icon name="Video" size={16} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Icon name="Phone" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1 mb-4 h-48">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className="flex items-start space-x-3"
                          >
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-mint text-white text-xs">
                                {message.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-gray-100 rounded-lg p-3">
                                <p className="text-sm font-medium text-gray-800">
                                  {message.author}
                                </p>
                                <p className="text-sm">{message.text}</p>
                              </div>
                              <span className="text-xs text-gray-500 mt-1">
                                {message.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Напишите сообщение..."
                        className="flex-1"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <Button
                        size="icon"
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-coral to-mint hover:from-coral/90 hover:to-mint/90"
                      >
                        <Icon name="Send" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Channels Tab */}
          <TabsContent value="channels" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-montserrat font-bold">Каналы</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-coral to-mint hover:from-coral/90 hover:to-mint/90">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать канал
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Создать канал</DialogTitle>
                    <DialogDescription>
                      Создайте новый канал для публикации контента
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="channel-name">Название канала</Label>
                      <Input
                        id="channel-name"
                        placeholder="Введите название канала"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="channel-description">Описание</Label>
                      <Textarea
                        id="channel-description"
                        placeholder="Описание канала"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="channel-emoji">Эмодзи</Label>
                      <Input
                        id="channel-emoji"
                        placeholder="🎥"
                        maxLength={2}
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-coral to-mint hover:from-coral/90 hover:to-mint/90">
                      Создать канал
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {channels.map((channel) => (
                <Card
                  key={channel.id}
                  className="bg-white/80 backdrop-blur-md border-coral/20 hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{channel.avatar}</div>
                      <div>
                        <CardTitle className="text-lg">
                          {channel.name}
                        </CardTitle>
                        <CardDescription>
                          {channel.subscribers} подписчиков
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      {channel.description}
                    </p>
                    <Button className="w-full bg-gradient-to-r from-coral to-mint hover:from-coral/90 hover:to-mint/90">
                      Подписаться
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-montserrat font-bold">Видео</h2>
              <Button className="bg-gradient-to-r from-coral to-mint hover:from-coral/90 hover:to-mint/90">
                <Icon name="Plus" size={16} className="mr-2" />
                Создать видео
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card
                  key={video.id}
                  className="bg-white/80 backdrop-blur-md border-coral/20 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-coral/20 to-mint/20 flex items-center justify-center text-6xl rounded-t-lg">
                        {video.thumbnail}
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <Badge
                          variant={video.isLive ? "destructive" : "secondary"}
                          className={
                            video.isLive
                              ? "bg-red-500 text-white animate-pulse"
                              : "bg-black/70 text-white"
                          }
                        >
                          {video.duration}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm mb-2">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {video.views} просмотров
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Calls Tab */}
          <TabsContent value="calls" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-md border-coral/20">
              <CardHeader>
                <CardTitle>Звонки</CardTitle>
                <CardDescription>
                  История звонков и быстрые вызовы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Icon
                    name="Phone"
                    size={48}
                    className="mx-auto mb-4 text-gray-400"
                  />
                  <p className="text-gray-500">Звонков пока нет</p>
                  <Button className="mt-4 bg-gradient-to-r from-coral to-mint hover:from-coral/90 hover:to-mint/90">
                    Начать звонок
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur-md border-coral/20">
                <CardHeader>
                  <CardTitle>Профиль</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-coral to-mint text-white text-2xl">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-medium mb-2">{user.name}</h3>
                  {user.isOwner && (
                    <Badge className="bg-gradient-to-r from-coral to-mint text-white mb-4">
                      ★ Владелец
                    </Badge>
                  )}
                  <p className="text-sm text-gray-500 mb-4">
                    {user.description}
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Редактировать профиль
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Редактировать профиль</DialogTitle>
                        <DialogDescription>
                          Измените информацию о себе
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="profile-name">Имя</Label>
                          <Input
                            id="profile-name"
                            value={user.name}
                            onChange={(e) =>
                              setUser({ ...user, name: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="profile-description">Описание</Label>
                          <Textarea
                            id="profile-description"
                            value={user.description}
                            onChange={(e) =>
                              setUser({ ...user, description: e.target.value })
                            }
                          />
                        </div>
                        <Button className="w-full bg-gradient-to-r from-coral to-mint hover:from-coral/90 hover:to-mint/90">
                          Сохранить изменения
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border-coral/20">
                <CardHeader>
                  <CardTitle>Настройки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="ghost" className="w-full justify-start">
                      <Icon name="Settings" size={16} className="mr-2" />
                      Общие настройки
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Icon name="Shield" size={16} className="mr-2" />
                      Приватность
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Icon name="Bell" size={16} className="mr-2" />
                      Уведомления
                    </Button>
                    <Separator />
                    {user.isOwner && (
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-coral"
                      >
                        <Icon name="Crown" size={16} className="mr-2" />
                        Владелец меню
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border-coral/20">
                <CardHeader>
                  <CardTitle>Статус</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">В сети</span>
                    </div>
                    <Input placeholder="Установить статус..." />
                    <Button className="w-full bg-gradient-to-r from-coral to-mint hover:from-coral/90 hover:to-mint/90">
                      Обновить статус
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
