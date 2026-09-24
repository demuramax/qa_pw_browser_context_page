/* eslint-disable max-len */
import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.favoriteArticleButton = page.getByRole('button').filter({ hasText: 'Favorite Article'}).first();
    this.unfavoriteArticleButton = page.getByRole('button').filter({ hasText: 'Unfavorite Article'}).first();
    this.profileLink = page.getByRole('link', { name: 'your profile image' });
    this.editArticleButton = page.getByRole('link', { name: ' Edit Article' }).first();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', {name: username }).first();
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async followArticle() {
    await test.step(`Click Favorite Article button`, async () => {
      await this.favoriteArticleButton.click();
    });
  }

  async goToProfile() {
    await test.step(`Go to profile link in the header`, async () => {
      await this.profileLink.click();
    })
  }

  async clickEditArticleButton() {
    await test.step(`Click on Edit Article Button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async assertUnfollowButtonIsVisible() {
    await test.step(`Assert Unfavorite (unfollow) Article button is visible`, async () => {
      await expect(this.unfavoriteArticleButton).toBeVisible();
    });
  }
}
