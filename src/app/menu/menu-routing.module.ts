import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children:[
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)/*
        canActivate : [AuthService]*/
      },
      {
        path: 'notifications',
        loadChildren: () => import('../notifications/notifications.module').then( m => m.NotificationsPageModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('../chats/chats.module').then( m => m.ChatsPageModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('../signup/signup.module').then( m => m.SignupPageModule)
      },
      {
        path: 'createpost',
        loadChildren: () => import('../createpost/createpost.module').then( m => m.CreatepostPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../categories/categories.module').then( m => m.CategoriesPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then( m => m.AboutPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'chatroom',
        loadChildren: () => import('../chatroom/chatroom.module').then( m => m.ChatroomPageModule)
      },
      {
        path: 'viewcontact',
        loadChildren: () => import('../viewcontact/viewcontact.module').then( m => m.ViewcontactPageModule)
      },
      {
        path: 'createswap',
        loadChildren: () => import('../createswap/createswap.module').then( m => m.CreateswapPageModule)
      },
      {
        path: 'viewitem',
        loadChildren: () => import('../viewitem/viewitem.module').then( m => m.ViewitemPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../favorites/favorites.module').then( m => m.FavoritesPageModule)
      },
      {
        path: 'filter',
        loadChildren: () => import('../filter/filter.module').then( m => m.FilterPageModule)
      },
      {
        path: 'help',
        loadChildren: () => import('../help/help.module').then( m => m.HelpPageModule)
      },
      {
        path: 'audio',
        loadChildren: () => import('../audio/audio.module').then( m => m.AudioPageModule)
      },
      {
        path: 'security',
        loadChildren: () => import('../security/security.module').then( m => m.SecurityPageModule)
      },
      {
        path: 'accountsettings',
        loadChildren: () => import('../accountsettings/accountsettings.module').then( m => m.AccountsettingsPageModule)
      },
      {
        path: 'viewswap',
        loadChildren: () => import('../viewswap/viewswap.module').then( m => m.ViewswapPageModule)
      },
      {
        path: 'createcategories',
        loadChildren: () => import('../createcategories/createcategories.module').then( m => m.CreatecategoriesPageModule)
      },
      {
        path: 'createsubcategories',
        loadChildren: () => import('../createsubcategories/createsubcategories.module').then( m => m.CreatesubcategoriesPageModule)
      },
      {
        path: 'subcategories',
        loadChildren: () => import('../subcategories/subcategories.module').then( m => m.SubcategoriesPageModule)
      },
      {
        path: 'testing',
        loadChildren: () => import('../testing/testing.module').then( m => m.TestingPageModule)
      },
      {
        path: 'passwordchange',
        loadChildren: () => import('../passwordchange/passwordchange.module').then( m => m.PasswordchangePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
